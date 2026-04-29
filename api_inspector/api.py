import os

import frappe


@frappe.whitelist()
def get_all_doctypes_paths():
    doctypes = frappe.get_all("DocType", fields=["name", "module"], order_by="name asc")
    rows = []

    for doctype in doctypes:
        module = doctype.get("module")
        if not module:
            try:
                module = frappe.get_meta(doctype.name).module
            except Exception:
                module = None

        if not module:
            continue

        try:
            path = os.path.abspath(frappe.get_module_path(module))
        except Exception:
            continue

        rows.append({"name": doctype.name, "path": path})

    return {
        "app_path": os.path.abspath(frappe.get_app_path("api_inspector")),
        "doctypes": rows,
    }
