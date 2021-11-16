import { action, createStore, persist } from "easy-peasy";

export default createStore(
    persist({
        employee: {
            employeeId: null,
            designation: null,
        },
        loginEmployee: action(
            (state: any, { employeeId, designation }: any) => {
                console.log(employeeId, designation);
                state.employee.employeeId = employeeId;
                state.employee.designation = designation;
                console.log(
                    state.employee.employeeId,
                    state.employee.designation
                );
            }
        ),
        logoutEmployee: action((state: any) => {
            state.employee.employeeId = undefined;
            state.employee.designation = undefined;
        }),
    })
);
