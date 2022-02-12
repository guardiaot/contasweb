
export const initialState = {
    email:'',
    ano: '',
    mes:''
}
export const UserReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_EMAIL':
            return {...state, email:action.payload.email};
        break;
        case 'SET_ANO':
            return {...state, ano:action.payload.ano};
        break;
        case 'SET_MES':
            return {...state, mes:action.payload.mes};
        break;    
    }
    return state;
}