const Notification = ({ notification }) => {
    if (notification === null) return null;
    return (
        <div className={notification.isError ? 'error' : 'success'}>
            {notification.message}
        </div>
    );
};

export default Notification;
