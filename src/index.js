const config = {
  serverAddr: "http://localhost:3200"
}


function getEmployees(callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `${config.serverAddr}/employees`);
  xhr.responseType = 'json';

  xhr.onerror = () => { alert(`Connection error: ${xhr.status}`); }
  xhr.onload = () => {
    if (xhr.status == 200) {
      const employees = xhr.response.map(employee => {
        const birthdayDate = new Date(+employee.birthday - (employee.id * 150000000000));
        const month = birthdayDate.getUTCMonth() + 1;
        const day = birthdayDate.getUTCDate();
        const year = birthdayDate.getUTCFullYear();
        const birthday = day + '.' + month + '.' + year;

        return {
          ...employee,
          birthday,
          salary: `₽ ${+employee.salary}`,
        }
      });
      callback(employees);
    }
    else
      alert('Request failed');
  }

  xhr.send();
}


function fillEmployees() {
  const returnEmployees = function (employees) {
    const templateStr = document.getElementById('employeeTemplate').innerHTML;
    let employeeTemplate = _.template(templateStr);
    let table = document.getElementById("employeeTableBody");
    table.innerHTML = employeeTemplate({employees: employees});
  };
  getEmployees(returnEmployees);
}


fillEmployees();
