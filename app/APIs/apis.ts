import * as axios from 'axios'
import * as config from '../globals/APIs/'

/*
Don't dispatch any actions here. Do it at the component level. It brings more
clarity on what's happening.
This file should be a collection of pure async functions.
*/

export const sampleApi: () => Function = () => () => axios.get(config.sampleApi)
