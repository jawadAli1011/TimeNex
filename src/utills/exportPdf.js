import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportListToPDF = (employees) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Employee Attendance Report", 14, 20);

  doc.setFontSize(10);
  doc.text(`Total Employees: ${employees.length}`, 14, 28);

  autoTable(doc, {
    startY: 35,

    head: [
      ["ID", "Name", "Department", "Designation", "Status"]
    ],

    body: employees.map((employee) => [
      employee.id,
      employee.name,
      employee.department,
      employee.designation,
      employee.status,
    ]),

    theme: "grid",

    styles: {
      fontSize: 9,
    },

    headStyles: {
      fontStyle: "bold",
    },
  });

  doc.save("employee-attendance-report.pdf");
};