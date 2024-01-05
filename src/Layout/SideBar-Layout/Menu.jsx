import { BlogSvg, BonusUISvg, ButtonsSvg, CalanderSvg, ChartsSvg, ChatSvg, ContactSvg, EcommerceSvg, EditorsSvg, EmailSvg, FAQSvg, FilemanagerSvg, FormsSvg, GallarySvg, HeaderBookmarkSvg, HomeSvg, IconsSvg, JobsearchSvg, KanbanSvg, KnowledgebaseSvg, LearningSvg, MapsSvg, OthersSvg, ProjectSvg, SamplePageSvg, SearchResultSvg, SocialappSvg, SupportTicketSvg, TablesSvg, TaskSvg, TodoSvg, UiKitsSvg, UsersComponentSvg, WidgetsSvg } from '../../Data/svgIcons';

export const MENUITEMS = [
    {
        menutitle: 'Dashboard',
        Items: [
            { path: `${process.env.PUBLIC_URL}/dashboard`, bookmark: true, icon: FilemanagerSvg, title: 'Dashboard', type: 'link' }
        ]
    },
    {
        menutitle: 'Bots',
        Items: [
            { path: `${process.env.PUBLIC_URL}/bots`, bookmark: true, icon: FilemanagerSvg, title: 'Bots', type: 'link' }
        ]
    },
    {
        menutitle: 'Store',
        Items: [
            { path: `${process.env.PUBLIC_URL}/store`, bookmark: true, icon: FilemanagerSvg, title: 'Store', type: 'link' }
        ]
    },
    {
        menutitle: 'Chats Panel',
        Items: [
            { path: `${process.env.PUBLIC_URL}/chats-panel`, bookmark: true, icon: FilemanagerSvg, title: 'Chats Panel', type: 'link' }
        ]
    },
    {
        menutitle: 'Live Chats',
        Items: [
            { path: `${process.env.PUBLIC_URL}/live-chat`, bookmark: true, icon: FilemanagerSvg, title: 'Live Chats', type: 'link' }
        ]
    },
    {
        menutitle: 'Custom Flow',
        Items: [
            { path: `${process.env.PUBLIC_URL}/custom-chat-flow`, bookmark: true, icon: FilemanagerSvg, title: 'Custom Flow', type: 'link' }
        ]
    },
    {
        menutitle: 'Products',
        Items: [
            { path: `${process.env.PUBLIC_URL}/products`, bookmark: true, icon: FilemanagerSvg, title: 'Products', type: 'link' }
        ]
    },
    {
        menutitle: 'Agents',
        Items: [
            { path: `${process.env.PUBLIC_URL}/agents`, bookmark: true, icon: FilemanagerSvg, title: 'Agents', type: 'link' }
        ]
    },
    {
        menutitle: 'Request a feature',
        Items: [
            { path: `${process.env.REACT_APP_API_ULAI_CANNY}`, bookmark: true, icon: FilemanagerSvg, title: 'Request a feature', type: 'link' }
        ]
    },
    {
        menutitle: 'Tickets',
        Items: [
            { path: `${process.env.PUBLIC_URL}/tickets`, bookmark: true, icon: FilemanagerSvg, title: 'Tickets', type: 'link' }
        ]
    },
    {
        menutitle: 'WhatsApp Widget',
        Items: [
            { path: `${process.env.PUBLIC_URL}/whats-app-widget`, bookmark: true, icon: FilemanagerSvg, title: 'WhatsApp Widget', type: 'link' }
        ]
    }
];