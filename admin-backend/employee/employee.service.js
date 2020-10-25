const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Employee = db.Employee;
const User = db.User;
module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(empSearchParam) {
    console.log(empSearchParam)
    let objSearch = {};
    if(!!empSearchParam){
        let searchFirstName = null;
        let searchLastName = null;
        if(!!empSearchParam.empFirstName){
            searchFirstName = {"empFirstName":{ $regex : `.*${empSearchParam.empFirstName}.*`, '$options' : 'i'}}
            objSearch = searchFirstName;
        }
        if(!!empSearchParam.empLastName){
            searchLastName = {"empLastName": {$regex :`.*${empSearchParam.empLastName}.*`, '$options' : 'i'} }
            objSearch = searchLastName;
        }
        if(searchFirstName && searchLastName ){
            objSearch = {"$and":[searchFirstName,searchLastName]}
        }
        console.log(objSearch)
    }
    return await Employee.find(objSearch);
}

async function getById(id) {
    return await Employee.findById(id);
}

async function create(empParam) {
    // validate
    if (await Employee.findOne({ empCode: empParam.empCode })) {
        throw 'Employee Code "' + empParam.empCode + '" is already taken';
    }
    const employee = new Employee(empParam);
    const userParam = {
        firstName:empParam.empFirstName,
        lastName:empParam.empLastName,
        username:empParam.username,
        password:empParam.password
    }
    const user = new User(userParam);
    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    //save user
    await user.save();
    // save employee
    await employee.save();
}

async function update(id, employeeParam) {
    const employee = await Employee.findById(id);

    // validate
    if (!employee) throw 'Employee not found';
    if (employee.empCode !== employeeParam.empCode && await Employee.findOne({ empCode: employeeParam.empCode })) {
        throw 'Employee code "' + employeeParam.empCode + '" is already taken';
    }

    // copy employeeParam properties to employee
    Object.assign(employee, employeeParam);

    await employee.save();
}

async function _delete(id) {
    await Employee.findByIdAndRemove(id);
}