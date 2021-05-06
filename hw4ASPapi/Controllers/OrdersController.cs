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
                                //from o in db.Orders
                                //group o by new
                                from o in db.Orders
                                where o.pricePaid > 13
                                group o by o.storeID into orderGroup
                                let count = orderGroup.Count()
                                orderby count descending
                                select new
                                {
                                    Store = orderGroup.Key,
                                    CDSales = orderGroup.Count()
                                };
            return OrderQuery.ToList();
        }

        //-------------------------------------------------------------------------------------------

        //Prepopulate Name Drop Down
       
       [Route ("people")]
        [HttpGet]
        public IEnumerable<object> GetPeople()
        {

            var PeopleQuery = from p in db.SalesPersonTables
                              select new
                              {
                                  p.FirstName,
                                  p.LastName
                              };
            return PeopleQuery.ToList();
        }


        //-----------------------------------------------------------------------------------------------------


        //Prepopulate City Drop Down Menu
       [Route("city")]
        [HttpGet]
        public IEnumerable<object> GetCities()
        {
            var CityQuery = from s in db.StoreTables
                            select new
                            {
                                s.City

                            };
            return CityQuery.ToList();
        }

    }
}