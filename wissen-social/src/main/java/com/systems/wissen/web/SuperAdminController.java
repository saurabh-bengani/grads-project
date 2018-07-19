package com.systems.wissen.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.systems.wissen.model.Admin;
import com.systems.wissen.repo.SuperAdminRepository;

@CrossOrigin(origins="*")
@RestController()
@RequestMapping("/api/Admins")
public class SuperAdminController {
    
	@Autowired
	private SuperAdminRepository superAdminRepository;
	
	@RequestMapping(method = RequestMethod.GET)
	public List<Admin> getAllAdmins(){
		List<Admin> admins=this.superAdminRepository.getAllAdmins();
		return admins;
	}

	@PostMapping(consumes = { "application/json" }, produces = { "application/json" })
	public Admin post(@RequestBody Admin admin) {

		return superAdminRepository.addAdmin(admin);
	}
	
	@RequestMapping(value ="/{admin_id}",method = RequestMethod.DELETE)
	public void removeAdmin(@PathVariable String admin_id){
		this.superAdminRepository.removeAdmin(admin_id);
	}

	
}