import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";

export const ViewerApp = () => {
  return (
    <>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </>
  )
}

