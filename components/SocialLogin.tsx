import { doSocialLogin } from '@/app/actions/authActions';
import { Icon } from '@iconify/react/dist/iconify.js';

const SocialLogin = () => {
  return (
    <div className="flex justify-center my-5">
      <form action={doSocialLogin}>
        <button
          type="submit"
          name="action"
          value="google"
          className="border-2 border-[#fc045c] p-2 rounded-xl hover:bg-[#fc045c] hover:text-white"
        >
          <div className="flex items-center">
            <p className="me-2">Sign In with</p>

            <Icon icon="logos:google-icon" />
          </div>
        </button>
      </form>
    </div>
  );
};

export default SocialLogin;
