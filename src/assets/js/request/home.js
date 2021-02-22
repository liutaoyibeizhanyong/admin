import { GET } from './axios'
export function getEcharts(params) {
    return GET('/api/echarts',params)
}
