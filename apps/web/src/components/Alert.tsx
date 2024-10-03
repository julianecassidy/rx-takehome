type AlertsProps = {
    messages: Array<string>;
}

export default function Alert({ messages}: AlertsProps) {

    return (
        <div
          className="Alert bg-secondary/30 p-6 rounded-lg border-2 border-secondary"
          role="alert">
          {messages.map(error => (
            <p key={error}>
              {error}
            </p>
          ))}
        </div>
      );
}