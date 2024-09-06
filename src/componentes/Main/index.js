import estilos from './Main.module.css';

function Main(props) {
    return (
        <main>
            <div className={estilos.container}>
                {props.children}
            </div>
        </main>
    )
}

export default Main;