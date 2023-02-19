import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get('/api/tickets')
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleViewSolution = (ticketId) => {
    axios
      .put(`/api/tickets/${ticketId}`, { isResolved: true })
      .then((res) => {
        const updatedTicket = res.data;
        setTickets((prevTickets) =>
          prevTickets.map((ticket) => {
            if (ticket._id === updatedTicket._id) {
              return updatedTicket;
            }
            return ticket;
          })
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Tickets</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Order ID</th>
            <th>Issue Description</th>
            <th>Status</th>
            <th>Timestamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket._id}</td>
              <td>{ticket.customerName}</td>
              <td>{ticket.email}</td>
              <td>{ticket.orderId}</td>
              <td>{ticket.issueDescription}</td>
              <td>{ticket.isResolved ? 'Resolved' : 'Pending'}</td>
              <td>{ticket.createdAt}</td>
              <td>
                {ticket.isResolved && (
                  <button onClick={() => handleViewSolution(ticket._id)}>
                    View Solution
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
