import { Link } from "react-router";

const AboutPreview = () => {
  return (
    <section className="mt-12 flex items-center gap-8 bg-gray-900">
      <img
        src="/images/profile.jpg"
        alt="profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
      />
      <div className="text-2xl font-bold">About me</div>
      <p className="text-gray-200">hi this is about me preview txt</p>
      <Link to="/about" className="text-blue-700">
        read more
      </Link>
    </section>
  );
};

export default AboutPreview;
