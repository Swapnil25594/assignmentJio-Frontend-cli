
export class Constant {
     public static apiEndpoint = 'https://glacial-sands-63718.herokuapp.com/api';
    // public static apiEndpoint = 'http://localhost:3000/api';

    public static register = Constant.apiEndpoint + '/UserModels';
    public static login = Constant.apiEndpoint + '/UserModels/login';
    public static getInterestList = Constant.apiEndpoint + '/AOTExpressions';
    public static getList = Constant.apiEndpoint + '/AOTExpressions/getInterestList';
    public static signOut = Constant.apiEndpoint + '/UserModels/logout';
}