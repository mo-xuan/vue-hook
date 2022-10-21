/*
获取app的相关配置（海内外，钻石购买）
*/
import {ref, onMounted} from 'vue-demi'
import type {Ref} from 'vue-demi';
import {getAppEnvironment} from '../../dsbridge'

export interface Config {
    configDiamond: Ref<boolean>;
    configIsOverseas: Ref<boolean>;
    configIsOverseasAndDiamond: Ref<boolean>;
    handleGetConfig: () => {
        configDiamond: Ref<boolean>;
        configIsOverseas: Ref<boolean>;
        configIsOverseasAndDiamond: Ref<boolean>;
    }
}

export default function useConfig(): Config {

    const configDiamond = ref(true)
    const configIsOverseas = ref(true)
    const configIsOverseasAndDiamond = ref(true)

    const handleGetConfig = () => {
        const env = getAppEnvironment()
        const envKeysArrayLength = Object.keys(env).length
        if (envKeysArrayLength) {
            configDiamond.value = env.inapp_purchase
            if (env.system === 'android') {
                configIsOverseas.value = [
                    'google',
                    'saxo',
                    'chuanyin',
                    'huaweiglobal'
                ].includes(env.channel)
            } else {
                configIsOverseas.value = !!env.configIsOverseas
            }
            configIsOverseasAndDiamond.value = configIsOverseas.value && configDiamond.value
        }

        return {
            configDiamond,
            configIsOverseas,
            configIsOverseasAndDiamond,
        }
    }

    onMounted(handleGetConfig)

    return {
        configDiamond,
        configIsOverseas,
        configIsOverseasAndDiamond,
        handleGetConfig,
    }
}
