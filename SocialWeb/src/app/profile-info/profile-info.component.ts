import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploadRetreiveService } from '../file-upload-retreive.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private fileService: FileUploadRetreiveService) { }
  employeeInfo: any;
  empId:any;
  id: any;
  name: any;
  image: any;
  url1 = 'http://localhost:8080/api/wiseconnect/v1/file/';
  bio: any;
  addresses: any;
  city: any;
  employeeName: any;
  degree: any;
  institute: any;
  currentPosition: any;
  certifications: any=[];
  emailId: any;
  firstName:any;
  lastName:any; 
  contact:any;
  phone:any;
  skillsStack:any=[];
  isEditingProfile=false;
  

  ngOnInit() {
    this.empId = this.route.snapshot.paramMap.get('p1');
    console.log(this.empId);
    this.getEmp(this.empId);
  }

  getEmp(empId) {
    this.employeeService.fetchDetails(empId)
      .subscribe((employee) => {
        this.employeeInfo = employee;
        console.log(employee);
        this.id = this.employeeInfo.empId;
        this.fileService.getFile(this.id, 'bioPic').subscribe((e) => {
          this.createImageFromBlob(e); 
        }, error => {  
          console.log(error);
        })
        this.url1 = this.url1 + this.id + "/" + "bioPic";

        this.bio = this.employeeInfo.bio;
        if(this.employeeInfo.addresses[0])
        this.city = this.employeeInfo.addresses[0].city;
        this.firstName = this.employeeInfo.firstName;
        this.lastName = this.employeeInfo.lastName;
        this.degree = this.employeeInfo.qualificationDegree;
        this.institute = this.employeeInfo.instituteName;
        this.employeeName = this.firstName + " " + this.lastName;
       this.currentPosition = this.employeeInfo.currentPosition;
        this.emailId = this.employeeInfo.emailId;
        this.contact = this.employeeInfo.contactNumberPersonal;
        this.phone = this.employeeInfo.contactNumberWork;
        this.employeeInfo.certifications.forEach((c)=>{
          console.log(c)
        this.certifications.push(c);
        });
         this.employeeInfo.skills.forEach((s)=>{
        this.skillsStack.push(s.allSkill);
           console.log(s.allSkill);
        });
        console.log(this.certifications);
      });
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.image = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  toggleIsEdittingProfile(){
    this.isEditingProfile=!this.isEditingProfile;
  }

}