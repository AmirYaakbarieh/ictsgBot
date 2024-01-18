export interface IChatbotNode {
    firstWire: string;
    id: string;
    type: string;
    wires: string[];
    z: string;
    x: number;
    y: number;
    name?: string;
    question?: string;
    required?: boolean;
    answer?: string;
    appointmentQuestion?: string;
    duration?: number;
    durationType?: number;
    waitingUnit?: string;
    units?: string;
    maxScore?: number
    questionFile?: any
    rules?: any;
    panels?: any;
    payload?: string;
    property?: string;
    properties?: string
}


export interface BotData {
    botName: string;
    botFile: string;
    status: boolean;
    template: boolean;
    userId: string;
}


export interface IUserId {
    userId: string;
}

export interface IGlobal {
    id: string;
    label: string;
    nodes: any;
    configs: any;
}

export interface ICodeBlocks {
    id: string;
    botName: string;
    photo?: any;
    open: boolean

}

export interface IBotId {
    botId: string;
}

export interface BotChange {
    botId: string;
    data: {
        botName: string;
        // typeBot: string;
        // description: string;
    }
}

export interface AuthTestParams {
    path: string;
    data: any;
}

export interface BotNode {
    id: string;
    type: string;
    z: string;
}

export interface singupModel {
    path: string;
    data: {
        name: string;
        email: string;
        password: string;
        phone: number;
        type: string
    }
}

export interface editUserInfo {
    path: string;
    data: {
        userId: string;
        editdata: {
            fullName: string;
            username: string;
            city: string;
            street: string;
            address: string;
            postcode: string;
            type: string
        }
    }
}


export interface editORGInfo {
    path: string;
    data: {
        orgId: string;
        editdata: {
            name: string;
            website: string;
            email: string;
            phone: string;
            address: string;
            memberCount: number;
            activityZone: string
        }
    }
}

export interface getUser {
    path: string;
    data: {
        userId: string
    }
}

export interface getUserInfo {
    path: string;
    data: {
        userId: string
    }
}

export interface saveFile {
    path: string;
    data: {
        fileId: string;
        usage: string;
        IDS: any;
    }
}

export interface saveChatInfo {
    path: string;
    data: {
        botId: string;
        chatJSONFile: string;
        customer?: string;
    }
}

export interface listChatsOfBot {
    path: string;
    data: {
        botId: string;
        customerId?: string;
    }
}






