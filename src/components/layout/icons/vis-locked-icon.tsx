import VISLocked from '../../../assets/VISLockedIcon.png';

export const VISLockedIcon = () => {
    return (
        <div style={{
            width: 30,
            height: 30,
            display: 'inline-block',
            maxWidth: '100%',
            maxHeight: '100%'
        }}>
            <img style={{ maxWidth: '100%' }} src={VISLocked} alt=""/>
        </div>
    )
}
