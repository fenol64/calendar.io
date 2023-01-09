import localforage from 'localforage'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { appApi } from '../../services/Api'
import Pageloading from '../../components/PageLoading'

type user = {
    uuid: string
    name: string
    username: string
    emails: string
    phones: string
    created_at: string
    updated_at: string
}

type eventType = {
    uuid?: string
    title: string
    subtitle: string
    description: string
    date: string
    start_date?: string
    end_date?: string
    remember_email?: any
    remember_sms?: any
    remember_whatsapp?: any
    created_at: string
    updated_at: string
}

export default function App() {
    const router = useRouter()
    const [loading, toggleLoading] = useState(false)
    const [event_loading, toggleEventLoading] = useState(false)
    const [modal, toggleModal] = useState(false)
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState({} as eventType)
    const [user, setUser] = useState({} as user)

    const getEvents = async (uuid: string | null = null) => {
        try {
            toggleLoading(true)
            const events = await appApi.get('/events', { params: { user_uuid: uuid ?? user.uuid } });
            setEvents(events.data)
        } catch (error) {
            console.error(error)
        } finally {
            toggleLoading(false)
        }
    }

    const handleCreateEventInput = (e: React.ChangeEvent<any>) => {
        let { name, value } = e.target

        console.log(name, value)

        if (name.includes('remember_')) value = (value === 'no') ? 'yes' : 'no'

        console.log(name, value)


        setEvent({ ...event, [name]: value })
    }

    const handleCreateEvent = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            toggleEventLoading(true)
            const event_data = await appApi.post('/events', { ...event, user_uuid: user.uuid })


            getEvents(user.uuid)
        } catch (error) {
            console.error(error)
            alert('Erro ao criar evento')
        } finally {
            toggleEventLoading(false)
            toggleModal(false)
        }

    }

    const handleDeleteEvent = async () => {
        try {
            toggleEventLoading(true)
            const event_data = await appApi.delete(`/events`, { params: { uuid: event.uuid } })
            getEvents()
        } catch (error) {
            console.log(error)
            alert('Erro ao deletar evento')
        } finally {
            toggleEventLoading(false)
        }
    }

    useEffect(() => {
        (async () => {
            toggleLoading(true)
            const user_data: user | null = await localforage.getItem('user')
            if (!user_data) return router.push('/login')
            setUser(user_data)
            getEvents(user_data.uuid)
        })()
    }, [])

    useEffect(() => {
        console.log(event)
    }, [event])

    return (<>
        <div className="container-fluid">
            <nav className="navbar border-bottom pb-2 mb-3">
                {loading ?
                    <span className="navbar-brand placeholder-glow w-25">
                        <span className="placeholder col-4"></span>
                        <small className='small text-muted ms-2 h4'>(<span className="placeholder col-2"></span>)</small>
                    </span>
                    : <span className="navbar-brand mb-0 h1 text-pastel ">
                        Olá {user.name?.split(' ')[0] ?? ""}
                        <small className='small text-muted ms-2 h4'>({user.username})</small>
                    </span>}
                {/* logout btn */}
                <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={() => {
                    localforage.removeItem('user')
                    router.push('/login')
                }}>Sair</button>
            </nav>
            <div className='row g-3'>
                <div className="col-12">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-pastel w-100 w-md-50" onClick={() => toggleModal(!modal)}>Criar meu lembrete</button>
                    </div>
                </div>
                {loading ? Array(6).fill(0).map((_, i) => <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                    <div className="card alert alert-warning h-100" aria-hidden="true">
                        <div className="card-body">
                            <h5 className="card-title placeholder-glow">
                                <span className="placeholder col-4"></span>
                            </h5>
                            <p className="card-text placeholder-glow">
                                <span className="placeholder col-12"></span>
                                <span className="placeholder col-4"></span>
                            </p>
                            <div className="w-100 d-flex justify-content-end ">
                                <a href="#" tabIndex={-1} className="btn btn-pastel disabled  col-2"> <i className='fad fa-arrow-right' /> </a>
                            </div>
                        </div>
                    </div>
                </div>) : (events.length <= 0 ? <div className="col-12">
                    <div className="d-flex justify-content-center">
                        <div className='alert alert-warning w-md-25'>
                            <h4 className='alert-heading'>Nenhum evento encontrado</h4>
                            <p>Seu calendário está vazio, crie um evento para começar a usar o Calendar.io</p>
                            <hr />
                            <p className="mb-2">Clique no botão abaixo para criar um evento</p>
                            <button className="btn btn-outline-pastel" onClick={() => toggleModal(!modal)}>Criar meu lembrete</button>
                        </div>
                    </div>
                </div> : events.map((event: any) => <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                    <div className="card  alert alert-warning">
                        <div className="card-body">
                            <h5 className="card-title">{event.title}</h5>
                            <p className="card-text">{event.subtitle}</p>
                            <div className="w-100 d-flex justify-content-end align-items-end ">
                                <a href="#" className="btn btn-pastel" onClick={() => {

                                    event.date = event.date.substring(0, 16)

                                    event.remember_on.split(",").map(item => {
                                        event["remember_" + item] = "yes"
                                    })

                                    setEvent(event);
                                    toggleModal(!modal)
                                }}><i className='fad fa-arrow-right' /></a>
                            </div>
                        </div>
                    </div>
                </div>))}
            </div>
        </div>
        {modal && <div className="modal fade show" style={{ display: 'block', background: "rgba(0,0,0,.5)" }} aria-modal="true" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Criar evento</h5>
                    </div>
                    <form onSubmit={handleCreateEvent} className="p-0 m-0">
                        <div className="modal-body">
                            <div className='row g-2'>
                                <div className="col-12">
                                    <label htmlFor="name" className="form-label">Nome do evento</label>
                                    <input type="text" className="form-control" name="title" placeholder="Nome do evento" value={event.title} onChange={handleCreateEventInput} />
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="subtitle" className="form-label">subtítulo</label>
                                    <input type="text" className="form-control" name="subtitle" placeholder="subtítulo do evento" value={event.subtitle} onChange={handleCreateEventInput} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="description" className="form-label">Descrição</label>
                                    <textarea className="form-control" name="description" rows={3} placeholder="Descrição do evento" value={event.description} onChange={handleCreateEventInput} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="rebember_on" className="form-label">Lembar no</label>
                                    <div className="row">
                                        <div className="col-6">
                                            <input type="checkbox" className="form-check-input" name="remember_email" value={event.remember_email ?? "no"} checked={event.remember_email == 'yes'} onChange={handleCreateEventInput} /> <label htmlFor="rebember_on" className="form-check-label">email</label>
                                        </div>
                                        <div className="col-6">
                                            <input type="checkbox" className="form-check-input" name="remember_whatsapp" value={event.remember_whatsapp ?? "no"} checked={event.remember_whatsapp == 'yes'} onChange={handleCreateEventInput} /> <label htmlFor="rebember_on" className="form-check-label">whatsapp</label>
                                        </div>
                                        <div className="col-6">
                                            <input type="checkbox" className="form-check-input" name="remember_sms" value={event.remember_sms ?? "no"} checked={event.remember_sms == 'yes'} onChange={handleCreateEventInput} /> <label htmlFor="rebember_on" className="form-check-label">sms</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="datetime-local" className="form-label">Data e hora</label>
                                    <input type="datetime-local" className="form-control" name="date" value={event.date} onChange={handleCreateEventInput} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            {/* delete button */}
                            {event.uuid && <button type="button" className="btn btn-danger mr-auto" onClick={handleDeleteEvent}>Deletar</button>}
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-secondary" onClick={() => {
                                    setEvent({} as eventType);
                                    toggleModal(false)
                                }}>Fechar</button>
                                <button type="submit" className="btn btn-pastel">{event_loading ? <Pageloading /> : "Salvar"}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>}
    </>)
}
