import request from './../requestFileData'

export const getInitConfig=() => request.get('/static/config.json',{},{}) 
