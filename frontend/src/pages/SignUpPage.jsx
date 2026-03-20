import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast.error("El nombre completo es obligatorio");
    if (!formData.email.trim()) return toast.error("El correo es obligatorio");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Formato de correo invalido");
    if (!formData.password) return toast.error("La contraseña es obligatoria");
    if (formData.password.length < 6)
      return toast.error("La contraseña debe tener al menos 6 caracteres");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table className="flex justify-center">
          <tbody>
            <tr>
              <td>
                <div className="flex justify-center text-3xl mb-10 text-primary">
                  <b>Crear cuenta</b>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex justify-center text-xl mb-32 text-secondary">
                  Comienza creando una cuenta para manejar tus tareas
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="mb-12">
                  <label className="input input-bordered flex items-center gap-2 input-primary">
                    Nombre:
                    <input
                      type="text"
                      className="grow"
                      placeholder="Juan Perez"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="mb-12">
                  <label className="input input-bordered flex items-center gap-2 input-primary">
                    Correo:
                    <input
                      type="text"
                      className="grow"
                      placeholder="ejemplo@ejemplo"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="mb-12">
                  <label className="input input-bordered flex items-center gap-2 input-primary">
                    Contraseña:
                    <input
                      type={showPassword ? "text" : "password"}
                      className="grow"
                      placeholder="********"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-5 text-base-content/40" />
                      ) : (
                        <Eye className="size-5 text-base-content/40" />
                      )}
                    </button>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="mb-12">
                  <button
                    type="submit"
                    className="btn btn-active btn-block btn-primary"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <>
                        <Loader2 className="size-5 animate-spin" /> Cargando...
                      </>
                    ) : (
                      "Registrar"
                    )}
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="text-center">
                  <p className="text-base-content/60">
                    Si ya tienes cuenta,{" "}
                    <Link to="/login" className="link link-primary">
                      Ingresa aca!
                    </Link>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default SignUpPage;
