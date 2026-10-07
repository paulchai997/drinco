import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

export interface KleapFormField {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "tel"
    | "url"
    | "number"
    | "textarea"
    | "select"
    | "checkbox";
  placeholder?: string;
  required?: boolean;
  options?: (string | { value: string; label: string })[];
  rows?: number;
}

export interface KleapFormProps {
  formId: string;
  title?: string;
  description?: string;
  fields: KleapFormField[];
  submitText?: string;
  successMessage?: string;
  className?: string;
}

const EMAILJS_SERVICE_ID = "service_konm2eh";
const EMAILJS_TEMPLATE_ID = "template_0sq6xjf";
const EMAILJS_PUBLIC_KEY = "KDjWaUl1FSs0qYizE";

export default function KleapForm({
  formId,
  title,
  description,
  fields = [],
  submitText = "Submit",
  successMessage = "Thank you! Your inquiry has been sent successfully.",
  className = "",
}: KleapFormProps) {

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {

    e.preventDefault();

    if (status === "sending") {
      return;
    }

    const form = e.currentTarget;

    setStatus("sending");

    try {

      const formData = new FormData(form);

      const templateParams = {
        name: formData.get("name") || "",
        company: formData.get("company") || "",
        email: formData.get("email") || "",
        phone: formData.get("phone") || "",
        country: formData.get("country") || "",
        tea_grade: formData.get("tea_grade") || "",
        quantity: formData.get("quantity") || "",
        incoterm: formData.get("incoterm") || "",
        message: formData.get("message") || "",
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      setStatus("success");

      form.reset();

    } catch (error) {

  console.error("EmailJS error:", error);

  alert(
    "EmailJS Error:\n\n" +
    (error instanceof Error ? error.message : JSON.stringify(error))
  );

  setStatus("error");

}
  }

  if (status === "success") {

    return (
      <div
        className={`rounded-xl border border-green-200 bg-green-50 p-6 text-green-800 ${className}`}
      >
        <p className="font-medium">
          {successMessage}
        </p>
      </div>
    );

  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex max-w-md flex-col gap-4 ${className}`}
    >

      {title && (
        <h3 className="text-xl font-semibold">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {fields.map((field) => {

        const id = `kf_${formId}_${field.name}`;

        const base =
          "rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-primary";

        return (

          <div
            key={field.name}
            className="flex flex-col gap-1.5"
          >

            <label
              htmlFor={id}
              className="text-sm font-medium text-green-600"
            >
              {field.label}

              {field.required && (
                <span className="text-red-500">
                  {" "}*
                </span>
              )}
            </label>


            {field.type === "textarea" ? (

              <textarea
                id={id}
                name={field.name}
                required={field.required}
                rows={field.rows ?? 5}
                placeholder={field.placeholder}
                className={base}
              />

            ) : field.type === "select" ? (

              <select
                id={id}
                name={field.name}
                required={field.required}
                className={base}
              >

                <option value="">
                  Select...
                </option>

                {(field.options || []).map((option) => {

                  const value =
                    typeof option === "string"
                      ? option
                      : option.value;

                  const label =
                    typeof option === "string"
                      ? option
                      : option.label;

                  return (
                    <option
                      key={value}
                      value={value}
                    >
                      {label}
                    </option>
                  );

                })}

              </select>

            ) : field.type === "checkbox" ? (

              <input
                id={id}
                name={field.name}
                type="checkbox"
                required={field.required}
                className="h-4 w-4"
              />

            ) : (

              <input
                id={id}
                name={field.name}
                type={field.type || "text"}
                required={field.required}
                placeholder={field.placeholder}
                className={base}
              />

            )}

          </div>

        );

      })}


      {status === "error" && (

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">

          Something went wrong while sending your inquiry.

          Please try again or email us directly at:

          <a
            href="mailto:paul.chai@drincointernational.com"
            className="font-semibold underline"
          >
            paul.chai@drincointernational.com
          </a>

        </div>

      )}


      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-[#0d3329] px-5 py-3 font-semibold text-[#f4ecdc] transition hover:bg-[#164b3d] disabled:cursor-not-allowed disabled:opacity-60"
      >

        {status === "sending"
          ? "Sending..."
          : submitText}

      </button>

    </form>
  );
}