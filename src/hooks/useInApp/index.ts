/*
获取是否在app内
*/
import {ref, onMounted} from 'vue-demi'
import type {Ref} from 'vue-demi';

export interface InApp {
    inApp: Ref<boolean>;
    handleGetInAppStatus: () => {
        inApp: Ref<boolean>;
    }
}

export default function useInApp(): InApp {

    const inApp = ref(false)

    const handleGetInAppStatus = () => {
        const ua = navigator.userAgent || ''
        inApp.value = ua.indexOf('SAXO') > -1;
        return {
            inApp
        }
    }

    onMounted(handleGetInAppStatus)

    return {
        inApp,
        handleGetInAppStatus
    }

}
