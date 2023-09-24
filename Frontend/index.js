const searchDate = document.getElementById('searchDate');
const markAttendance = document.getElementById('markAttendance');
const report = document.getElementById('report');

searchDate.addEventListener('click', searchAttendance);
markAttendance.addEventListener('click', submitAttendance);
report.addEventListener('click', getReport);

let students = [];

getStudentsAuto()
async function getStudentsAuto(){
    await axios.get('http://localhost:2000/allStudents')
        .then((responce) => {
             console.log(responce.data.data);
            students = responce.data.data;
        })
        .catch(err => console.log(err))
}

async function searchAttendance(e){
    e.preventDefault();
    console.log('rajesh and mohit')
    let dates = []
    await axios.get('http://localhost:2000/getDate')
        .then((responce) => {
            dates = responce.data.data;
        })
        .catch(err => console.log(err))

    let presentDate = document.getElementById('getDate').value;
    let dateValue = false;

    dates.forEach(date => {
        var arr = [...date.date];
        arr.splice(10,20);
        arr = arr.join('');
        if(arr === presentDate){
            dateValue = true
        }
    })
    console.log("rajesh and mohit")
    if(dateValue){
        showMarkedStudents(presentDate)
    }else{
        showAllStudents();
    } 

}

async function showAllStudents(){

    document.getElementById('studentListForMarking').style.display = 'block';
    const parent = document.getElementById('studentListForMarkingAtt');

    students.forEach(stud => {
        console.log(stud.names);
        const li = document.createElement('li');
        li.className = 'list-group-item student';
        
        const spanName = document.createElement('span');
        const spanId = document.createElement('span');
        spanName.textContent = stud.names;
        spanId.textContent = stud.id;
        spanId.style.display = 'none'
        li.appendChild(spanId);
        li.appendChild(spanName);

        const div = document.createElement('form');
        div.className = 'form-check form-check-inline float-end';

        const abradio = document.createElement('input');
        abradio.type = 'radio'
        abradio.name = 'status'
        abradio.id = `a${stud.id}`;
        abradio.value = 'absent';

        const ablabel= document.createElement('label');
        ablabel.className ='m-2'
        ablabel.setAttribute("for",`a${stud.id}`);
        ablabel.textContent = 'Absent';

        const preradio = document.createElement('input');
        preradio.type = 'radio'
        preradio.name = 'status'
        preradio.id = `p${stud.id}`;
        preradio.value = 'present';
        
        const prelabel= document.createElement('label');
        prelabel.className = 'm-2';
        prelabel.setAttribute("for",`p${stud.id}`);
        prelabel.textContent = 'Present'
        
        div.appendChild(abradio);
        div.appendChild(ablabel);
        div.appendChild(preradio);
        div.appendChild(prelabel);
        
        li.appendChild(div);
        
        parent.appendChild(li);
    })
}

async function submitAttendance(){
    // console.log('attendance submitted');
    let num = document.querySelectorAll('input[name="status"]:checked');
    if(num.length == 9){
        let newList = [];

        const date = document.getElementById('getDate').value;
        newList.push(date);

        const studentList = document.querySelectorAll('.student')

        studentList.forEach(student => {
            let id = student.firstChild.textContent;

            const ele = student.lastChild.elements;
            // console.log(ele);
            let status = ''

            for(let i=0; i<ele.length;i++){
                if(ele[i].checked){
                    // console.log(ele[i].value);
                    status = ele[i].value
                }   
            }
            newList.push(status)
        })

        await axios.post('http://localhost:2000/postAttendance',{
            date: newList[0],
            s1: newList[1],
            s2: newList[2],
            s3: newList[3],
            s4: newList[4],
            s5: newList[5],
            s6: newList[6],
            s7: newList[7],
            s8: newList[8],
            s9: newList[9]
        })
            .then(responce => {
                alert(responce.data.msg)
                location.reload();
            })
            .catch(err => console.log(err));
    }
    else{
        alert("Please select all fields!!");
    }
}

async function showMarkedStudents(presentDate){

    document.getElementById('studentListAfterMarking').style.display = 'block';
    const parent = document.getElementById('srudentListAfterMarkingAtt');

    let attendanceMarked = [];
    
    await axios.get(`http://localhost:2000/marked/${presentDate}`)
        .then(responce => {
            // console.log(responce.data.result[0]);
            attendanceMarked = responce.data.result[0];
        })
        .catch(err => console.log(err));
    
    let listv = []

    Object.values(attendanceMarked).forEach(value => {
        listv.push(value);
    })

    students.forEach((student)=>{
        const li = document.createElement('li');
        li.className = 'list-group-item';

        const spanName = document.createElement('span');
        spanName.textContent = student.names;
        li.appendChild(spanName);

        const div = document.createElement('div');
        div.className = 'form-check-inline float-end';

        const span = document.createElement('span');
        const label = document.createElement('label');
        label.className = 'form-check-label';

        if(listv[student.id+1] === 'absent'){
            span.innerHTML = '&#10060;'
            label.innerText = 'Absent'
        }
        else{
            span.innerHTML = '&#9989;'
            label.innerText = 'Present'
        }

        div.appendChild(span);
        div.appendChild(label);

        li.appendChild(div);
        parent.appendChild(li)
    })
}

async function getReport(){

    document.getElementById('gotReport').style.display = 'block';
    const parent = document.getElementById('attReportUl');

    let report = []
    await axios.get('http://localhost:2000/getReport')
        .then(responce =>{
            report = responce.data.result;
        })
        .catch(err => console.log(err));
    
    let val = [];
    report.forEach(res =>{
        let val1 = []
        Object.values(res).forEach(i => {
            val1.push(i)
        })
        val.push(val1);
    })

    let avg = [];
    students.forEach(num => {
        var count = 0;
        var q = num.id;
        for(let n = 0; n< val.length;n++){
            let z = val[n];
            if(z[q+1] == 'present'){
                count++
            }
        }
        avg.push(count);
    })

    students.forEach(stud => {
        const li = document.createElement('li');
        li.className = 'list-group-item';

        const spanName = document.createElement('span');
        spanName.textContent = stud.names;
        li.appendChild(spanName);

        const span = document.createElement('span');
        span.className = 'float-end';
        const span2 = document.createElement('span');
        span2.className = 'float-end';

        const span1 = document.createElement('span');
        span1.className = 'float-end';
        span2.textContent = `(  ${avg[stud.id-1]}/${val.length}  )`;
        let a = (avg[stud.id-1]/val.length)*100;
        a = Math.trunc(a)
        span1.textContent = `${a}%`;
     
        li.appendChild(span);
        li.appendChild(span2)
        li.appendChild(span1);
        parent.appendChild(li)
    })
}
