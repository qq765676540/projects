using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Office.Core;
using Microsoft.Office.Interop.Excel;
using System.IO;
using System.Reflection;

namespace ExcelUtilWebAPI.Controllers
{
    public class MyController : ApiController
    {
        // GET api/my
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        // GET api/my/str
        public string Get(string str)
        {
            excel(str);
            return str;
        }

        // GET api/my/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/my
        public void Post([FromBody]string value)
        {
        }

        // PUT api/my/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/my/5
        public void Delete(int id)
        {
        }

        private void excel(string str) 
        {
            Application app = new Application();
            //app.AlertBeforeOverwriting = false;
            //app.Visible = false;
            //app.DisplayAlerts = false;
            Workbooks wbks = app.Workbooks;
            _Workbook _wbk = wbks.Open(str);
            

            Sheets shs = _wbk.Sheets;

            _Worksheet _wsh = (_Worksheet)shs.get_Item(1);

            _wsh.Name = "abc";

            ((Range)_wsh.Rows[1, Missing.Value]).Insert(Missing.Value, XlInsertFormatOrigin.xlFormatFromLeftOrAbove);
            //_wbk.SaveAs("d:\\abc.xlsx", Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlNoChange, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value);
            _wbk.Save();
            //_wbk.Close();
            //wbks.Close();
            //if (_wbk != null)
            //    _wbk = null;  // WorkBook 的实例欢畅
            //if (app != null)
            app.Quit(); // Microsoft.Office.Interop.Excel  的实例对象 
            GC.Collect();  // 回收资源


            app = null;
        }
    }
}
