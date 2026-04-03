/**
 * 🍱 Mumbai ka Dabbawala Service - ES6 Classes
 *
 * Mumbai ke famous dabbawala system ko ab modern ES6 class mein likho!
 * Har din hazaaron dabbas deliver hote hain aur ek bhi galat nahi jaata.
 * Tumhe DabbaService class banana hai jo customers manage kare, delivery
 * batches banaye, aur daily reports generate kare.
 *
 * Class: DabbaService
 *
 *   constructor(serviceName, area)
 *     - this.serviceName = serviceName
 *     - this.area = area
 *     - this.customers = [] (internal array)
 *     - this._nextId = 1 (auto-increment counter)
 *
 *   addCustomer(name, address, mealPreference)
 *     - mealPreference must be one of: "veg", "nonveg", "jain"
 *     - Agar invalid preference, return null
 *     - Agar name already exists (duplicate), return null
 *     - Creates customer: { id: auto-increment, name, address, mealPreference,
 *       active: true, delivered: false }
 *     - Pushes to this.customers
 *     - Returns the customer object
 *
 *   removeCustomer(name)
 *     - Sets customer's active to false (soft delete)
 *     - Returns true if found and deactivated
 *     - Returns false if not found or already inactive
 *
 *   createDeliveryBatch()
 *     - Returns array of delivery objects for all ACTIVE customers
 *     - Each delivery: { customerId: id, name, address, mealPreference,
 *       batchTime: new Date().toISOString() }
 *     - Resets delivered to false for all active customers before creating batch
 *     - Returns empty array if no active customers
 *
 *   markDelivered(customerId)
 *     - Finds active customer by id, sets delivered to true
 *     - Returns true if found and marked
 *     - Returns false if not found or not active
 *
 *   getDailyReport()
 *     - Returns report object for ACTIVE customers only:
 *       {
 *         totalCustomers: number (active only),
 *         delivered: number (active and delivered === true),
 *         pending: number (active and delivered === false),
 *         mealBreakdown: { veg: count, nonveg: count, jain: count }
 *       }
 *     - mealBreakdown counts active customers only
 *
 *   getCustomer(name)
 *     - Returns customer object by name (including inactive)
 *     - Returns null if not found
 *
 * Rules:
 *   - Use ES6 class syntax (not constructor functions)
 *   - Customer ids auto-increment starting from 1
 *   - No duplicate customer names allowed
 *   - removeCustomer is a soft delete (active: false), not actual removal
 *   - getDailyReport only counts active customers
 *   - mealPreference must be exactly "veg", "nonveg", or "jain"
 *
 * @example
 *   const service = new DabbaService("Raju Dabba", "Dadar");
 *   service.addCustomer("Amit", "Andheri West", "veg");
 *   // => { id: 1, name: "Amit", address: "Andheri West", mealPreference: "veg", active: true, delivered: false }
 *   service.addCustomer("Priya", "Bandra East", "jain");
 *   // => { id: 2, ... }
 *   service.createDeliveryBatch();
 *   // => [{ customerId: 1, name: "Amit", ... }, { customerId: 2, name: "Priya", ... }]
 *   service.markDelivered(1);       // => true
 *   service.getDailyReport();
 *   // => { totalCustomers: 2, delivered: 1, pending: 1, mealBreakdown: { veg: 1, nonveg: 0, jain: 1 } }
 */
export class DabbaService {
  constructor(serviceName, area) {
    // Your code here
     this.serviceName = serviceName
     this.area = area
     this.customers = []
     this._nextId = 1 
  }

  addCustomer(name, address, mealPreference) {
    // Your code here
//     *   addCustomer(name, address, mealPreference)
//  *     - mealPreference must be one of: "veg", "nonveg", "jain"
//  *     - Agar invalid preference, return null
//  *     - Agar name already exists (duplicate), return null
//  *     - Creates customer: { id: auto-increment, name, address, mealPreference,
//  *       active: true, delivered: false }
//  *     - Pushes to this.customers
//  *     - Returns the customer object

       if(mealPreference !== "veg" && mealPreference !== "nonveg" && mealPreference !== "jain")
          return null;

       if(this.customers.some(item => item.name === name))
         return null;

       const id = this._nextId++;
       const customer = { id: id, name, address, mealPreference,active: true, 
                          delivered: false }

       this.customers.push(customer)

       return customer;
  }



  removeCustomer(name) {
    // Your code here
    //   *   removeCustomer(name)
//  *     - Sets customer's active to false (soft delete)
//  *     - Returns true if found and deactivated
//  *     - Returns false if not found or already inactive
    
     const currentCustomer = this.customers.find(customer => customer.name === name);
 
      if(!currentCustomer || currentCustomer.active === false)
        return false;

      currentCustomer.active = false;

      return true;
  }

  createDeliveryBatch() {
    // Your code here
    //  *   createDeliveryBatch()
//  *     - Returns array of delivery objects for all ACTIVE customers
//  *     - Each delivery: { customerId: id, name, address, mealPreference,
//  *       batchTime: new Date().toISOString() }
//  *     - Resets delivered to false for all active customers before creating batch
//  *     - Returns empty array if no active customers

      const activeCustomers = this.customers.filter(customer => customer.active === true);

     if(activeCustomers.length === 0)
      return [];

     activeCustomers.forEach(customer => customer.delivered = false);

     const batchTime = new Date().toISOString;

     const deliveries = activeCustomers.map(customer=> ({

              customerId : customer.id,
              name: customer.name,
              address: customer.address,
              mealPreference: customer.mealPreference,
              batchTime:batchTime,
     
    }));

    return deliveries;

  }

  markDelivered(customerId) {
    // Your code here
    //  *   markDelivered(customerId)
//  *     - Finds active customer by id, sets delivered to true
//  *     - Returns true if found and marked
//  *     - Returns false if not found or not active
       const customer = this.customers.find(customer => customer.id ===  customerId);

       return customer===undefined? false : customer.delivered = true;



  }

  getDailyReport() {
    // Your code here
    //  *   getDailyReport()
//  *     - Returns report object for ACTIVE customers only:
//  *       {
//  *         totalCustomers: number (active only),
//  *         delivered: number (active and delivered === true),
//  *         pending: number (active and delivered === false),
//  *         mealBreakdown: { veg: count, nonveg: count, jain: count }
//  *       }
//  *     - mealBreakdown counts active customers only
       
       const customer = this.customers.filter(customer => customer.active === true);
       const deliveredCustomer = customer.filter(customer => customer.delivered === true);

       const vegCount = customer.filter(customer => customer.mealPreference === "veg").length;
       const nonVegCount = customer.filter(customer => customer.mealPreference === "nonveg").length;
       const jainCount = customer.length - vegCount - nonVegCount;

       const totalCustomers = customer.length;
       const delivered = deliveredCustomer.length;
       const pending = totalCustomers - delivered;
       const mealBreakdown = {veg: vegCount, nonveg: nonVegCount, jain: jainCount};

       return {
        totalCustomers, 
        delivered,
        pending,
        mealBreakdown,
       }
       
       
  }

  getCustomer(name) {
    // Your code here
//  *   getCustomer(name)
//  *     - Returns customer object by name (including inactive)
//  *     - Returns null if not found
       
       const customer = this.customers.find(customer => customer.name === name);
       
       return customer === undefined? null: customer;

  }
}
