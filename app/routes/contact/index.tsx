const ContactPage = ({ actionData }: Route.ComponentProps) => {
  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
      <h2 className="pb-6 text-xl font-bold">Contact me</h2>
      {actionData?.message ? (
        <p className="bg-green-700 text-green-100 mb-6 text-center shadow-md">
          {actionData.message}
        </p>
      ) : null}
      <form
        method="post"
        className="space-y-6"
        action="https://formspree.io/f/mwvnklon"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 pb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 pb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-300 pb-2"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300 pb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer">
          Send Msg
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
