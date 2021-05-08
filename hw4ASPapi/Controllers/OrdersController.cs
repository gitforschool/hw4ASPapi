  
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

using System.Net;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Net.Http;
using System.Web.UI.WebControls;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;

namespace hw4ASPapi.Controllers
{
    [System.Web.Http.RoutePrefix("api/orders")]
    public class OrdersController : ApiController
    {

        NodeOrders500Entitie db = new NodeOrders500Entitie();
        //GET: Orders

        //Fill Order Detail Table With Given Data
        public IEnumerable<object> GetOrders()
        {

            var OrderQuery =
                                  from o in db.Orders
                                  where o.pricePaid > 13
                                  join s in db.StoreTables on o.storeID equals s.storeID
                                  group new { o, s } by s.City into orderGroup
                                  let count = orderGroup.Count()
                                  orderby count descending
                                  select new
                                  {
                                      Store = orderGroup.Key,

                                      CDSales = orderGroup.Count()
                                  };
            return OrderQuery.Distinct().ToList();

        }

        //-------------------------------------------------------------------------------------------

        //Prepopulate Name Drop Down

        [Route("people")]
        [HttpGet]
        public IEnumerable<object> GetPeopleList()
        {

            var PeopleQuery = (from o in db.Orders
                               join s in db.SalesPersonTables on o.salesPersonID equals s.salesPersonID
                               select new
                               {
                                   s.FirstName
                               });


            var person = PeopleQuery;
            return person.Distinct().ToList();
        }



        //-----------------------------------------------------------------------------------------------------


        //Prepopulate City Drop Down Menu
        [Route("city")]
        [HttpGet]
        public IEnumerable<object> GetCitiesList()
        {
            var CityQuery = from o in db.Orders
                            join s in db.StoreTables on o.storeID equals s.storeID
                            select new
                            {
                                s.City

                            };
            return CityQuery.Distinct().ToList();
        }

        // ---------------------------------------------------------------------------------------------------------------



        //Get Data From Selected Sales Person
        [System.Web.Http.Route("pSales")]
        [HttpGet]
        public IHttpActionResult PersonSales(string id)
        {

            try
            {

                var personSalesQuery = from o in db.Orders
                                       join s in db.SalesPersonTables on o.salesPersonID equals s.salesPersonID

                                       where s.FirstName == id

                                       //let Person = s.FirstName + " " + s.LastName
                                       group new { o, s } by s.FirstName into SalesPersonGroup

                                       select new
                                       {
                                           Person = SalesPersonGroup.Key,
                                           Price = SalesPersonGroup.Sum(x => x.o.pricePaid)

                                       };
                return Ok(personSalesQuery);
            }
            catch (Exception)
            {
                return NotFound();
            }

        }

        //--------------------------------------------------------------
        //Store Sales

        [System.Web.Http.Route("sSales")]
        [HttpGet]
        public IHttpActionResult StoreSales(string id)
        {


            try
            {
                //int myId = Int32.Parse(id);

                var StoreSalesQuery = from o in db.Orders
                                      join s in db.StoreTables on o.storeID equals s.storeID
                                      where s.City == id
                                      group new { o, s } by s.City into SalesPersonGroup
                                      let count = SalesPersonGroup.Count()
                                      select new
                                      {
                                          Store = SalesPersonGroup.Key,
                                          Price = SalesPersonGroup.Sum(x => x.o.pricePaid)

                                      };
                return Ok(StoreSalesQuery);
            }

            catch (Exception)
            {
                return NotFound();
            }

        }
    }

}

