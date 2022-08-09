import Modal from 'react-modal';
import { useUiStore } from '../../hooks';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const DetailVoteModal = ({title, children}) => {

    const { isModalOpen, closeModal } = useUiStore();

    const onCloseModal = () => {
        closeModal();
    }

    return (
        <Modal
            isOpen={ isModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 300 }
        >
            <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="btn-close" onClick={onCloseModal}>
                </button>
            </div>

            <div className="modal-body">
                {children}
            </div>
        </Modal>
    )
}
