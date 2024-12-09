const express = require("express");
const db = require("../models");

const ApiRouter = express.Router();

// Create user
ApiRouter.get("/employee/list", async (req, res, next) => {
    try {
        const listEmployees = await db.employee.find({}).populate("department").populate("jobs");
        const output = listEmployees.map(listEmployee => {
            return {
                employeeId: listEmployee._id,
                fullname: `${listEmployee.name.firstName || ""} ${listEmployee.name.middleName || ""} ${listEmployee.name.lastName || ""}`,
                email: listEmployee.account.email,
                department: listEmployee.department.name,
                jobs: listEmployee.jobs.map(listEmployee => {
                    return {
                        name: listEmployee.name,
                        issues: listEmployee.issues.map(i => {
                            return {
                                title: i.title,
                                isCompleted: i.isCompleted
                            }
                        })
                    }
                })
            };
        });
        console.log(output)
        res.status(201).json(output);
    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});
ApiRouter.get("/department/:departmentId", async (req, res, next) => {
    try {
        const departmentId = req.params.departmentId
        const department = await db.department.findById(departmentId)
        const employee = await db.employee.find({ department: departmentId }).populate("department")
        const employeeManagerId = employee.filter(e => e.manager)
        const nhanvien = employee.filter(e => !e.manager)
        const employeeManager = await db.employee.findById(employeeManagerId)

        const output = {
            department: department.name,
            manager: `${employeeManager.name.firstName || ""} ${employeeManager.name.middleName} ${employeeManager.name.lastName}`,
            employees: nhanvien.map(nv => {
                return {
                    _id: nv._id,
                    fullname: `${nv.name.firstName || ""} ${nv.name.middleName} ${nv.name.lastName}`,
                }
            })
        }

        res.status(201).json(output);
    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});
ApiRouter.post("/employee/:employeeId/add-job", async (req, res, next) => {
    try {
        const employeeId = req.params.employeeId
        const values = req.body
        const employee = await db.employee.findById(employeeId)
        const job = await db.job.create(values)
        employee.jobs.push(job._id)
        await employee.save()
        const output = {
            employeeId: employeeId,
            fullname: `${employee.name.firstName || ""} ${employee.name.middleName} ${employee.name.lastName}`,
            jobsList: employee.jobs
        }

        res.status(201).json({
            message: "Add a new job sucessfully",
            result: output
        });
    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

module.exports = ApiRouter;
