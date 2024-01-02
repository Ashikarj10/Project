export class Supplier 
{
    id: number; 
    name: string; 
    contactPerson: string; 
    email: string; 
    phone: any; 
    location:string;
    assetName:string;
    
  
    constructor(id: number, name: string, contactPerson: string, email: string, phone: string, location:string,assetName:string)
     {
      this.id = id;
      this.name = name;
      this.contactPerson = contactPerson;
      this.email = email;
      this.phone = phone;
      this.location = location;
      this.assetName=assetName;
     

    }
  }
  