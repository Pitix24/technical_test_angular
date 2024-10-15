export interface Client {
    firs_name: string,
    last_name: string,
    email: string
}

export interface GlobalParameter extends Client {
    send_welcome_email: boolean
}

export interface ClientAndToken extends GlobalParameter {
    id_token: string
}