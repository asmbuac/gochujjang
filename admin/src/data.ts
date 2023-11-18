import {
  HomeOutlined,
  PersonOutline,
  PeopleOutline,
  ShoppingCartOutlined,
  AssignmentOutlined,
  LibraryBooksOutlined,
  GridView,
  NoteAltOutlined,
  NotesOutlined,
  CalendarMonthOutlined,
  SettingsOutlined,
  BackupOutlined,
  LeaderboardOutlined,
  TextSnippetOutlined,
} from "@mui/icons-material";

export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Home",
        url: "/",
        icon: HomeOutlined,
      },
      {
        id: 2,
        title: "Profile",
        url: "/users/1",
        icon: PersonOutline,
      },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 1,
        title: "Users",
        url: "/users",
        icon: PeopleOutline,
      },
      {
        id: 2,
        title: "Products",
        url: "/products",
        icon: ShoppingCartOutlined,
      },
      {
        id: 3,
        title: "Orders",
        url: "/orders",
        icon: AssignmentOutlined,
      },
      {
        id: 4,
        title: "Posts",
        url: "/posts",
        icon: LibraryBooksOutlined,
      },
    ],
  },
  {
    id: 3,
    title: "general",
    listItems: [
      {
        id: 1,
        title: "Elements",
        url: "/",
        icon: GridView,
      },
      {
        id: 2,
        title: "Notes",
        url: "/",
        icon: NoteAltOutlined,
      },
      {
        id: 3,
        title: "Forms",
        url: "/",
        icon: NotesOutlined,
      },
      {
        id: 4,
        title: "Calendar",
        url: "/",
        icon: CalendarMonthOutlined,
      },
    ],
  },
  {
    id: 4,
    title: "Maintenance",
    listItems: [
      {
        id: 1,
        title: "Settings",
        url: "/",
        icon: SettingsOutlined,
      },
      {
        id: 2,
        title: "Backups",
        url: "/",
        icon: BackupOutlined,
      },
    ],
  },
  {
    id: 5,
    title: "analytics",
    listItems: [
      {
        id: 1,
        title: "Charts",
        url: "/",
        icon: LeaderboardOutlined,
      },
      {
        id: 2,
        title: "Logs",
        url: "/",
        icon: TextSnippetOutlined,
      },
    ],
  },
];
