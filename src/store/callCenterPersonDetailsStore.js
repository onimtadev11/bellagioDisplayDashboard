import axios from "axios";

const bellagioApi = axios.create({
    // baseURL: process.env.MIX_APP_REPORT_TOKEN_URL,
    baseURL: "http://192.168.15.204:5056/api/",
});

const state = {

};

const getters = {

};

const mutations = {


};

const actions = {

    // getDataToEditLeadPoolCallCenter({ commit }, payload) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const { data } = await bellagioApi.post(
    //                 "Bellagio/CRMMKT/CommonExecute",
    //                 {
    //                     HasReturnData: "T",
    //                     Parameters: [
    //                         {
    //                             Para_Data: 1049,
    //                             Para_Direction: "Input",
    //                             Para_Lenth: 1,
    //                             Para_Name: "@Iid",
    //                             Para_Type: "int",
    //                         },
    //                         {
    //                             Para_Data: payload.MID,
    //                             Para_Direction: "Input",
    //                             Para_Lenth: 100,
    //                             Para_Name: "@Text1",
    //                             Para_Type: "varchar",
    //                         },
    //                     ],
    //                     SpName: "sp_CRM_Common_API",
    //                     con: "1",
    //                 }
    //             );

    //             const resData = data.CommonResult.Table;

    //             resolve(resData);
    //         } catch (error) {
    //             console.error("Error saving of imported value:", error);
    //             reject(error);
    //         }
    //     });
    // },

    EditAllocateGuestDetailsCallCenter({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await bellagioApi.post(


                    "Bellagio/CRMMKT/CommonExecute",
                    {
                        HasReturnData: "T",
                        Parameters: [
                            {
                                Para_Data: 1078,
                                Para_Direction: "Input",
                                Para_Lenth: 1,
                                Para_Name: "@Iid",
                                Para_Type: "int",
                            },
                            {
                                Para_Data: payload.MID,
                                Para_Direction: "Input",
                                Para_Lenth: 100,
                                Para_Name: "@Text1",
                                Para_Type: "varchar",
                            },

                            {
                                Para_Data: payload.data,
                                Para_Direction: "Input",
                                Para_Lenth: 100,
                                Para_Name: "@Text2",
                                Para_Type: "varchar",
                            },
                            {
                                Para_Data: payload.number,
                                Para_Direction: "Input",
                                Para_Lenth: 100,
                                Para_Name: "@Text3",
                                Para_Type: "varchar",
                            },
                        ],
                        SpName: "sp_CRM_Common_API",
                        con: "1",
                    }
                );
                resolve(data.CommonResult.Table);
            } catch (error) {
                console.error("Error submit dates:", error);
                reject(error);
            }
        });
    },
    GetAllDataOfCallCenter({ commit }, ) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await bellagioApi.post(


                    "Bellagio/CRMMKT/CommonExecute",
                    {
                        HasReturnData: "T",
                        Parameters: [
                            {
                                Para_Data: 1079,
                                Para_Direction: "Input",
                                Para_Lenth: 1,
                                Para_Name: "@Iid",
                                Para_Type: "int",
                            },
                        ],
                        SpName: "sp_CRM_Common_API",
                        con: "1",
                    }
                );
                resolve(data.CommonResult.Table);
            } catch (error) {
                console.error("Error submit dates:", error);
                reject(error);
            }
        });
    },

    getCallCenterPerson({ }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await bellagioApi.post(
                    "Bellagio/CRMMKT/CommonExecute",
                    {
                        HasReturnData: "T",
                        Parameters: [
                            {
                                Para_Data: 1063,
                                Para_Direction: "Input",
                                Para_Lenth: 1,
                                Para_Name: "@Iid",
                                Para_Type: "int",
                            },

                        ],
                        SpName: "sp_CRM_Common_API",
                        con: "1",
                    }
                );

                const resData = data.CommonResult.Table;

                resolve(resData);
            } catch (error) {
                console.error("Error submit dates:", error);
                reject(error);
            }
        });

    },

    getDataToEditCallCenter({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await bellagioApi.post(
                    "Bellagio/CRMMKT/CommonExecute",
                    {
                        HasReturnData: "T",
                        Parameters: [
                            {
                                Para_Data: 1064,
                                Para_Direction: "Input",
                                Para_Lenth: 1,
                                Para_Name: "@Iid",
                                Para_Type: "int",
                            },
                            {
                                Para_Data: payload.callCenterPerson,
                                Para_Direction: "Input",
                                Para_Lenth: 100,
                                Para_Name: "@Text1",
                                Para_Type: "varchar",
                            },
                        ],
                        SpName: "sp_CRM_Common_API",
                        con: "1",
                    }
                );

                const resData = data.CommonResult.Table;

                resolve(resData);
            } catch (error) {
                console.error("Error saving of imported value:", error);
                reject(error);
            }
        });
    },



};

export default { namespaced: true, state, getters, mutations, actions };
