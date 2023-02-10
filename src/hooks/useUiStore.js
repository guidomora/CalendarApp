import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
    const {isDateModalOpen} = useSelector(state => state.ui)
    const dispatch = useDispatch();

    const openDateModal = () => {
      // importado del slice
      dispatch(onOpenModal())
    };

    const closeDateModal = () => {
        dispatch(onCloseModal())
    }

    return {
        isDateModalOpen,
        openDateModal,
        closeDateModal
    }
}