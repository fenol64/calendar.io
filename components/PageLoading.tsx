export default function Pageloading({ ...props }) {
    return <div className="page-loading-container py-3 text-center display-6"><i className={`fad fa-spinner-third fa-spin ${props.className ? props.className : ""}`} /></div>
}