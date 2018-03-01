/**
 * Created by www.Alga.me on 28/2/18.
 */

export default ()=> {
  return `${Math.random().toString(36).substr(2, 9)}-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`;
};
