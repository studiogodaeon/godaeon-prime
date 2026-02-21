import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validation
        if (!name || !name.trim()) {
            return NextResponse.json(
                { error: 'Name is required.' },
                { status: 400 }
            );
        }

        if (!email || !email.trim()) {
            return NextResponse.json(
                { error: 'Email is required.' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address.' },
                { status: 400 }
            );
        }

        if (!message || !message.trim()) {
            return NextResponse.json(
                { error: 'Message is required.' },
                { status: 400 }
            );
        }

        // Sanitize inputs
        const sanitized = {
            name: name.trim().slice(0, 200),
            email: email.trim().toLowerCase().slice(0, 200),
            subject: (subject || 'General Inquiry').trim().slice(0, 200),
            message: message.trim().slice(0, 5000),
            createdAt: new Date(),
            read: false,
        };

        // Insert into MongoDB
        const client = await clientPromise;
        const db = client.db('godaeon');
        const collection = db.collection('contacts');

        await collection.insertOne(sanitized);

        return NextResponse.json(
            { success: true, message: 'Message sent successfully!' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again later.' },
            { status: 500 }
        );
    }
}
