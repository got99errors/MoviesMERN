import {useEffect} from 'react'
import { Redirect } from "react-router-dom"
import { userActions } from '../_actions/user.actions';
import { menuActions} from '../_actions/menu.actions'
import {useDispatch} from "react-redux"

const LogoutComp = (props: any) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userActions.logout());
		dispatch(menuActions.selectedNon())
    },[dispatch])

    return (
        <Redirect to="/" />
    )
}

export default LogoutComp;