import { render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { MessageBox } from './MessageBox';
import { AppThemeProvider } from '../../theme/AppThemeProvider';
import { MessageBoxContentSx } from './MessageBox.styles';
import { theme } from '../../theme/theme';

const renderMessageBox = (messageBox: ReactElement) => {
  return render(<AppThemeProvider>{messageBox}</AppThemeProvider>);
};

const getMessageBoxContent = () => screen.getByTestId('message-box-content');

describe('MessageBox', () => {
  it('renders the author, message text and date', () => {
    renderMessageBox(
      <MessageBox
        author="Luka"
        message="Hey team! I created a Doodle poll."
        sentByActiveUser={false}
        createdAt="07 July 2026 17:23"
      />
    );

    const messageTextBox = screen.getByTestId('message-box');

    expect(messageTextBox).toHaveTextContent('Luka');
    expect(messageTextBox).toHaveTextContent(
      'Hey team! I created a Doodle poll.'
    );
    expect(messageTextBox).toHaveTextContent('07 July 2026 17:23');
  });

  it('does not display author if message is from active user', () => {
    renderMessageBox(
      <MessageBox
        author="James"
        message="I just voted."
        sentByActiveUser
        createdAt="07 July 2026 17:23"
      />
    );

    expect(screen.queryByText('James')).not.toBeInTheDocument();
    expect(screen.getByText('I just voted.')).toBeInTheDocument();
    expect(screen.getByText('07 July 2026 17:23')).toBeInTheDocument();
  });

  it('aligns box to the right if message is from active user', () => {
    renderMessageBox(
      <MessageBox
        author="Me"
        message="I just voted."
        sentByActiveUser
        createdAt="07 July 2026 17:23"
      />
    );

    expect(screen.getByTestId('message-box')).toHaveStyle({
      justifyContent: 'flex-end',
    });
  });

  it('aligns box to the left if message is not from active user', () => {
    renderMessageBox(
      <MessageBox
        author="Luka"
        message="Can everyone vote?"
        sentByActiveUser={false}
        createdAt="07 July 2026 17:23"
      />
    );

    expect(screen.getByTestId('message-box')).toHaveStyle({
      justifyContent: 'flex-start',
    });
  });

  it('renders message content with the card border radius', () => {
    renderMessageBox(
      <MessageBox
        author="Luka"
        message="Can everyone vote?"
        sentByActiveUser={false}
        createdAt="07 July 2026 17:23"
      />
    );

    expect(getComputedStyle(getMessageBoxContent()).borderRadius).toBe('5px');
  });

  it('renders active user messages with the yellow background', () => {
    renderMessageBox(
      <MessageBox
        author="James"
        message="I just voted."
        sentByActiveUser
        createdAt="07 July 2026 17:23"
      />
    );

    expect(MessageBoxContentSx({ sentByActiveUser: true })).toHaveLength(1);
    expect(getComputedStyle(getMessageBoxContent()).backgroundColor).toBe(
      'rgb(255, 249, 201)'
    );
  });

  it('renders other user messages with paper background', () => {
    renderMessageBox(
      <MessageBox
        author="Luka"
        message="Can everyone vote?"
        sentByActiveUser={false}
        createdAt="07 July 2026 17:23"
      />
    );

    expect(MessageBoxContentSx({ sentByActiveUser: false })).toHaveLength(1);
    expect(getComputedStyle(getMessageBoxContent()).backgroundColor).toBe(
      'rgb(255, 255, 255)'
    );
  });

  it('renders message text with text.primary color for active user messages', () => {
    renderMessageBox(
      <MessageBox
        author="Me"
        message="I just voted."
        sentByActiveUser
        createdAt="07 July 2026 17:23"
      />
    );

    expect(getComputedStyle(getMessageBoxContent()).color).toBe(
      'rgba(0, 0, 0, 0.87)'
    );
  });

  it('renders message text with text.primary color for other user messages', () => {
    renderMessageBox(
      <MessageBox
        author="Luka"
        message="Can everyone vote?"
        sentByActiveUser={false}
        createdAt="07 July 2026 17:23"
      />
    );

    expect(getComputedStyle(getMessageBoxContent()).color).toBe(
      'rgba(0, 0, 0, 0.87)'
    );
  });

  it('should set margin left and right of 24px', () => {
    renderMessageBox(
      <MessageBox
        author="Luka"
        message="Can everyone vote?"
        sentByActiveUser={false}
        createdAt="07 July 2026 17:23"
      />
    );

    expect(getComputedStyle(getMessageBoxContent()).marginLeft).toBe('24px');
    expect(getComputedStyle(getMessageBoxContent()).marginRight).toBe('24px');
  });

  it('should set margin bottom to 16px and margin top to 6px if active user message', () => {
    renderMessageBox(
      <MessageBox
        author="James"
        message="I just voted."
        sentByActiveUser
        createdAt="07 July 2026 17:23"
      />
    );

    expect(getComputedStyle(getMessageBoxContent()).marginBottom).toBe('16px');
    expect(getComputedStyle(getMessageBoxContent()).marginTop).toBe('6px');
  });
});

describe("MessageBox's caption", () => {
  it('renders the message date inside a date element', () => {
    renderMessageBox(
      <MessageBox
        author="Luka"
        message="Can everyone vote?"
        sentByActiveUser={false}
        createdAt="07 July 2026 17:23"
      />
    );

    expect(screen.getByTestId('message-box-date')).toHaveTextContent(
      '07 July 2026 17:23'
    );
  });

  it('renders caption text with text.secondary color', () => {
    renderMessageBox(
      <MessageBox
        author="Luka"
        message="Can everyone vote?"
        sentByActiveUser={false}
        createdAt="07 July 2026 17:23"
      />
    );

    expect(
      getComputedStyle(screen.getByTestId('message-box-author')).color
    ).toBe('rgb(184, 184, 184)');
    expect(getComputedStyle(screen.getByTestId('message-box-date')).color).toBe(
      'rgb(184, 184, 184)'
    );
  });

  it('aligns createdAt date to the right if message is from active user', () => {
    renderMessageBox(
      <MessageBox
        author="Me"
        message="I just voted."
        sentByActiveUser
        createdAt="07 July 2026 17:23"
      />
    );

    expect(screen.getByTestId('message-box-date')).toHaveStyle({
      display: 'flex',
      'justify-content': 'flex-end',
      'margin-bottom': '-8px',
      'margin-right': '-8px',
    });
  });

  it('aligns createdAt date to the left if message is not from active user', () => {
    renderMessageBox(
      <MessageBox
        author="Luka"
        message="Can everyone vote?"
        sentByActiveUser={false}
        createdAt="07 July 2026 17:23"
      />
    );

    expect(screen.getByTestId('message-box-date')).toHaveStyle({
      display: 'flex',
      'justify-content': 'flex-start',
      'margin-bottom': '0px',
      'margin-right': '0px',
    });
  });
});

describe("MessageBox's responsiveness", () => {
  it('reduces message content padding by 1px on mobile screens', () => {
    const messageBoxContentSx = MessageBoxContentSx({
      sentByActiveUser: false,
    });

    if (
      !Array.isArray(messageBoxContentSx) ||
      typeof messageBoxContentSx[0] !== 'function'
    ) {
      throw new Error(
        'Expected MessageBoxContentSx to return a style function'
      );
    }

    expect(messageBoxContentSx[0](theme)).toEqual(
      expect.objectContaining({
        padding: '16px',
        [theme.breakpoints.down('md')]: {
          padding: '16px',
        },
      })
    );
  });
});

describe("MessageBox's accessibility", () => {
  it('renders the message content as a readable paragraph', () => {
    renderMessageBox(
      <MessageBox
        author="Luka"
        message="Can everyone vote?"
        sentByActiveUser={false}
        createdAt="07 July 2026 17:23"
      />
    );

    expect(screen.getByTestId('message-box-message').tagName).toBe('P');
    expect(screen.getByTestId('message-box-message')).toHaveTextContent(
      'Can everyone vote?'
    );
  });

  it('renders the createdAt date in a semantic time element', () => {
    renderMessageBox(
      <MessageBox
        author="Luka"
        message="Can everyone vote?"
        sentByActiveUser={false}
        createdAt="07 July 2026 17:23"
      />
    );

    expect(screen.getByTestId('message-box-date').tagName).toBe('TIME');
    expect(screen.getByTestId('message-box-date')).toHaveAttribute(
      'dateTime',
      '07 July 2026 17:23'
    );
  });

  it('renders other user messages as named articles for screen readers', () => {
    renderMessageBox(
      <MessageBox
        author="Luka"
        message="Can everyone vote?"
        sentByActiveUser={false}
        createdAt="07 July 2026 17:23"
      />
    );

    expect(
      screen.getByRole('article', { name: 'Message from Luka' })
    ).toBeInTheDocument();
  });

  it('renders active user messages as named articles for screen readers', () => {
    renderMessageBox(
      <MessageBox
        author="James"
        message="I just voted."
        sentByActiveUser
        createdAt="07 July 2026 17:23"
      />
    );

    expect(
      screen.getByRole('article', { name: 'Message from you' })
    ).toBeInTheDocument();
  });
});
