import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/vue';
import LoginPage from './LoginPage.vue';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

let requestBody, counter = 0;
const server = setupServer(
  rest.post('/api/1.0/auth', (req, res, ctx) => {
    requestBody = req.body;
    counter += 1;
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Incorrect credentials'
      })
    );
  }),
);

beforeAll(() => server.listen());

beforeEach(() => {
  counter = 0;
  server.resetHandlers();
});

afterAll(() => server.close());

let emailInput, passwordInput, button;
const setup = async () => {
  render(LoginPage);

  emailInput = screen.queryByLabelText('E-mail');
  passwordInput = screen.queryByLabelText('Password');
  button = screen.queryByRole('button', { name: 'Login' });
}

describe('Login Page', () => {
  describe('Layout', () => {
    it('has Login header', async () => {
      await setup();

      const header = screen.queryByRole('heading', { name: 'Login' });
      expect(header).toBeInTheDocument();
    });

    it('has email input', async () => {
      await setup();

      const input = screen.queryByLabelText('E-mail');
      expect(input).toBeInTheDocument();
    });

    it('has password input', async () => {
      await setup();

      const input = screen.queryByLabelText('Password');
      expect(input).toBeInTheDocument();
    });

    it('has password type for password input', async () => {
      await setup();

      const input = screen.queryByLabelText('Password');
      expect(input.type).toBe('password');
    });

    it('has Login button', async () => {
      await setup();

      const button = screen.queryByRole('button', { name: 'Login' });
      expect(button).toBeInTheDocument();
    });

    it('disables the button initially', async () => {
      await setup();

      const button = screen.queryByRole('button', { name: 'Login' });
      expect(button).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    const setupFilled = async () => {
      await setup();

      await userEvent.type(emailInput, 'user100@mail.com');
      await userEvent.type(passwordInput, 'P4ssword');
    }

    it('enables the button when email and password inputs are filled', async () => {
      await setupFilled();

      expect(button).toBeEnabled();
    });

    it('displays spinner after clicking the button', async () => {
      await setupFilled();

      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      userEvent.click(button);

      expect(await screen.findByRole('status')).toBeInTheDocument();
    });

    it('hides spinner after api call finishes fail response', async () => {
      await setupFilled();
      await userEvent.click(button);

      const spinner = (screen.queryByRole('status'));
      await waitFor(() => {
        expect(spinner).not.toBeInTheDocument();
      });
    });

    it('sends email and password to the backend after clicking the button', async () => {
      await setupFilled();
      userEvent.click(button);

      const spinner = (await screen.findByRole('status'));
      await waitForElementToBeRemoved(spinner);

      expect(requestBody).toEqual({
        email: 'user100@mail.com',
        password: 'P4ssword'
      });
    });

    it('disables the button when there is an api call', async () => {
      await setupFilled();

      userEvent.click(button);
      userEvent.click(button);

      const spinner = (await screen.findByRole('status'));
      await waitForElementToBeRemoved(spinner);

      expect(counter).toBe(1);
    });

    it('displays authentication fail message', async () => {
      await setupFilled();
      await userEvent.click(button);

      const errorMessage = await screen.findByText('Incorrect credentials');
      expect(errorMessage).toBeInTheDocument();
    });

    it('clears authentication fail message when email field is changed', async () => {
      await setupFilled();
      await userEvent.click(button);

      const errorMessage = await screen.findByText('Incorrect credentials');

      await userEvent.type(emailInput, 'new@mail.com')

      expect(errorMessage).not.toBeInTheDocument();
    });

    it('clears authentication fail message when password field is changed', async () => {
      await setupFilled();
      await userEvent.click(button);

      const errorMessage = await screen.findByText('Incorrect credentials');

      await userEvent.type(passwordInput, 'n3wP4ssword')

      expect(errorMessage).not.toBeInTheDocument();
    });
  });
});
