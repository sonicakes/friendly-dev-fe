import type { Route } from "react-router";
import { Form } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  const errors:Record<string, string> = {};

  if (!name) errors.name = "Name is required";
  if (!email) {
    errors.email = "Email is required";
  }else if (!/^[^\s@]+2[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format';
  }

  if (!subject) errors.subject = "Subject is required";
  if (!message) errors.message = "Message is required";

  if (Object.keys(errors).length > 0) {
    return {errors}
  }

  const data = {
    name,
    email,
    subject,
    message
  };

  return {message: 'Form submitted successfully', data}
}

const ContactPage = ({actionData}: Route.ComponentProps) => {
  const errors = actionData?.errors || {};
  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
      <h2 className="pb-6 text-xl font-bold">Contact me</h2>
      {actionData?.message ? (<p className="bg-green-700 text-green-100 mb-6 text-center shadow-md">{actionData.message}</p>) : null}
      <Form method="post" className="space-y-6">
       
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 pb-2">Full Name</label>
          <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
       {errors.name && (<p className="text-red-300">{errors.name}</p>
       )}
        </div>

          <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 pb-2">Email</label>
          <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
         {errors.email && (<p className="text-red-300">{errors.email}</p>
       )}
        </div>

          <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 pb-2">Subject</label>
          <input type="text" id="subject" name="subject" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
         {errors.subject && (<p className="text-red-300">{errors.subject}</p>
       )}
        </div>
            <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 pb-2">Message</label>
          <textarea id="message" name="message" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
         {errors.message && (<p className="text-red-300">{errors.message}</p>
       )}
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer">Send Msg</button>
      </Form>
    </div>
  );
};

export default ContactPage;
