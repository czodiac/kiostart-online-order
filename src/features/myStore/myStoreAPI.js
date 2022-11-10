// A mock function to mimic making an async request for data
export function fetchMyStore() {
    return new Promise((resolve) =>
        setTimeout(() => resolve({ data: 1 }), 500)
    );
}