/**
 * Created by www.Alga.me on 27/2/18.
 */

export default async (promise) => {
    try {
        return [null, await promise];
    } catch (err){
        return [err];
    }
};


module.exports.reject = (messsage)=>{
    return Promise.reject(messsage);
};

module.exports.resolve = (data)=>{
    return Promise.resolve(data);
};
