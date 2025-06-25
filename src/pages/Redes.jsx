import { RedesC_Panel_Admin } from '../components/create/RedesC_Panel_Admin'

const redes = () => {
    return (
        <div>
            <h1 
            style={{ fontFamily: 'Lora, serif' }}
            className='font-black text-4xl text-gray-600'>Redes Comunitarias</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
            <p className='mb-8'>Para crear una Red Comunitaria llene los siguientes campos:</p>
            <RedesC_Panel_Admin />
        </div>
    )
}

export default redes