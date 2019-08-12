using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Reporting.WinForms;
using System.IO;

namespace RSReportPDF
{
    public partial class ReportView : Form
    {
        public ReportView()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            reportViewer1.ProcessingMode = ProcessingMode.Remote;
            DataClasses1DataContext ds = new DataClasses1DataContext();
            var reportbase = ds.ReportBase.ToArray();

            for (int i = 0; i < reportbase.Length; i++ )
            {
                
                string ReportServer = reportbase[i].ReportServer;
                string ReportPath = reportbase[i].ReportPath;
                
                reportViewer1.ServerReport.ReportServerUrl = new Uri(ReportServer);
                reportViewer1.ServerReport.ReportPath = ReportPath;
                this.reportViewer1.RefreshReport();

                ExportPDF("ReportName" + (i + 1));
                this.reportViewer1.Clear();

            }
            this.Close();
            Application.Exit();
        }
        private void ExportPDF(String ReportName)
        {

            byte[] bytes = reportViewer1.ServerReport.Render("PDF");//PDF
            FileStream fs = new FileStream(@"d:\\" + ReportName + ".PDF", FileMode.Create);
            fs.Write(bytes,0,bytes.Length);
            fs.Close();
            
        }

        private void reportViewer1_Load(object sender, EventArgs e)
        {

        }
    }
}
