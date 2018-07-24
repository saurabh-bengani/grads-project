import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AllSkillsService } from '../all-skills.service';
import { Observable } from 'rxjs';
import { FileUploadRetreiveService } from '../file-upload-retreive.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  employeeId = "";
  registerForm: FormGroup;
  skills: any = [];
  resume: File;
  bioPic:File;
  employeeInfo: any;
  submitted=false;
  firstNameError=false;
  contactError=false;
  firstNameErrorMessage:string='';
  errorMessage: string = '';
  passwordError=false;
  bioPicError=false;
  passwordErrorMessage:string='';
  bioPicErrorMessage:string='';
  //filteredSkills: Observable<string[]>;

  constructor(private fb: FormBuilder
    , private registrationService: RegistrationService
    , private router: Router
    , private allSkills: AllSkillsService
    , private fileUpload: FileUploadRetreiveService
    , private route: ActivatedRoute
    , private employeeService: EmployeeService) { }

  ngOnInit() {

    this.route.params.subscribe(params => console.log(params));
    this.employeeId = this.route.snapshot.paramMap.get('empId');
    console.log(this.employeeId);
    if (this.employeeId) {
      this.getEmp(this.employeeId);
    }

    this.registerForm = this.fb.group({
      empId: ['', Validators.required],
      firstName: ['', [Validators.required,Validators.minLength(4)]],
      lastName: [''],
      bioPic: [''],
      gender: ['Male'],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      maritalStatus: ['Unmarried'],
      emailId: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      contactNumberPersonal: ['', Validators.min(1000000000)],
      contactNumberWork: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      managerId: [''],
      currentPosition: ['', Validators.required],
      address: this.fb.group({
        street: [''],
        city: ['', Validators.required],
        state: [''],
        country: [''],
        zipcode: ['', Validators.required],
      }),
      qualificationDegree: ['', Validators.required],
      instituteName: ['', Validators.required],
      bio: [''],
      skills: this.fb.array([this.createSkill()]),
      certifications: this.fb.array([this.createCertificate()]),
      resume: ['']
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });

    this.allSkills.getSkills().subscribe(skills => {
      this.skills = skills;
      console.log(this.skills);
    })
    
    this.registerForm.get('firstName').valueChanges
    .subscribe(e => {
     
      if (e.length > 4) { this.firstNameErrorMessage = "";
      this.firstNameError=false; return };
      this.firstNameError=true;
      this.firstNameErrorMessage = "FirstName must be 4 character long"
    })
     
    this.registerForm.get('contactNumberWork').valueChanges
    .subscribe(e => {
      if (e.length === 10) { this.errorMessage = "";
      this.contactError=false; return };
      if (e.length > 10) { this.errorMessage = "Contact Number can't be greater than 10 length";
    this.contactError=true;};
    this.contactError=true;
      this.errorMessage = "Contact Number can't be smaller than 10 length"
    })
    
    this.registerForm.get('bioPic').valueChanges
    .subscribe(e => {
     
      if (e !== '') { this.bioPicErrorMessage = ""; 
      this.bioPicError=false;return };
      this.bioPicError=true;
      this.bioPicErrorMessage = "Bio Pic can't be empty"
    })
    
  }
  
  

  resumeFileChange(event) {
    this.resume = event.target.files.item(0);
  }

  bioPicFileChange(event) {
    this.bioPic = event.target.files.item(0);
   
  }

  getEmp(empId) {
    this.employeeService.fetchDetails(empId)
      .subscribe((employee) => {
        this.employeeInfo = employee;
        delete this.employeeInfo['bioPic'];
        delete this.employeeInfo['resume'];
        console.log(this.employeeInfo);
        this.removeSkill(0);
        this.employeeInfo.skills.forEach(element => {
          this.addSkill(element.allSkill);
        });
        this.removeCertificate(0);
        this.employeeInfo.certifications.forEach(element => {
          this.addCertificate(element.completionYear ,element.certificationName);
        });
        this.registerForm.patchValue(this.employeeInfo);
        this.registerForm.controls['address'].patchValue({
          street: this.employeeInfo.addresses[0].street,
          city: this.employeeInfo.addresses[0].city,
          state: this.employeeInfo.addresses[0].state,
          country: this.employeeInfo.addresses[0].country,
          zipcode: this.employeeInfo.addresses[0].zipcode
        });
      });
  }



  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        this.passwordError=true;
        this.passwordErrorMessage="Password and Confirm Password don't match";
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  createSkill(num?) {
    if(num){
      return this.fb.group({
        allSkillId: num
      });
    }
    return this.fb.group({
      allSkillId: ''
    });
  }

  addSkill(num?) {
    (<FormArray>this.registerForm.get('skills')).push(this.createSkill(num));
  }

  removeSkill(i: number) {
    (<FormArray>this.registerForm.get('skills')).removeAt(i);
  }

  createCertificate(year?,name?) {
    return this.fb.group({
      completionYear: year,
      certificationName: name
    });
  }

  addCertificate(year?,name?) {
    (<FormArray>this.registerForm.get('certifications')).push(this.createCertificate(year,name));
  }

  removeCertificate(i: number) {
    (<FormArray>this.registerForm.get('certifications')).removeAt(i);
  }

  displayFn(skill?): string | undefined {
    return skill ? skill.name : undefined;
  }

  register(e) {
    e.preventDefault();
    this.submitted=true;
    if (this.registerForm.valid) {
    //if (true) {
      if (this.resume) {
        this.fileUpload.uploadFile(this.resume, this.registerForm.get('empId').value,"resume").subscribe(e => {
          console.log(e);
        });
      }
      this.fileUpload.uploadFile(this.bioPic, this.registerForm.get('empId').value,"bioPic").subscribe(e => {
        console.log(e);
      });
      console.log(JSON.stringify(this.registerForm.value));
      console.log(this.registerForm.value)
      this.registrationService.register(this.registerForm.value).subscribe(e => {
      });
      this.router.navigateByUrl("/");
    }
    if (this.registerForm.invalid) {
      return;
  }
 
  }
}