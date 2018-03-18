import request from './request'

const memberController = 'matest';
console.log(request)

export const getInfo=(param) => request.get(memberController,'get',param);